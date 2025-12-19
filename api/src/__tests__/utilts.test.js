import extractFromRequest from "../utils/extractFromRequest.js";
import { hashPassword, comparePasswords } from "../utils/hashPassword.js";
import { generateUniqueCompanyInviteCode } from "../utils/uniqueCodes.ts";
import { Company } from "../mongoose/schemas/companySchema.js";


// --------------------------------


describe("extractFromRequest", () => {
	it("returns nested value for valid path", () => {
		const req = { user: { company: { id: 42 } } };
		const result = extractFromRequest(req, ["user", "company", "id"]);
		expect(result).toBe(42);
	});
	
	it("returns top-level value if pathArray has one key", () => {
		const req = { id: "abc123" };
		const result = extractFromRequest(req, ["id"]);
		expect(result).toBe("abc123");
	});
	
	it("returns undefined if any part of the path is missing", () => {
		const req = { user: {} };
		const result = extractFromRequest(req, ["user", "company", "id"]);
		expect(result).toBeUndefined();
	});
	
	it("works with empty pathArray (returns original object)", () => {
		const req = { something: "value" };
		const result = extractFromRequest(req, []);
		expect(result).toBe(req);
	});
	
	it("handles null or undefined request", () => {
		expect(() => extractFromRequest(null, ["a"])).toThrow();
		expect(() => extractFromRequest(undefined, ["a"])).toThrow();
	});
});


// --------------------------------


describe("hashPassword & comparePasswords", () => {
	it("hashPassword returns a bcrypt hash", () => {
		const hash = hashPassword("mySecret123");
		expect(typeof hash).toBe("string");
		expect(hash.startsWith("$2")).toBe(true);
	});
	
	it("comparePasswords returns true for correct password", () => {
		const password = "mySecret123";
		const hash = hashPassword(password);
		expect(comparePasswords(password, hash)).toBe(true);
	});
	
	it("comparePasswords returns false for incorrect password", () => {
		const hash = hashPassword("mySecret123");
		expect(comparePasswords("wrongPassword", hash)).toBe(false);
	});
	
	it("produces different hashes for same password due to salt", () => {
		const hash1 = hashPassword("samePassword");
		const hash2 = hashPassword("samePassword");
		expect(hash1).not.toBe(hash2);
		expect(comparePasswords("samePassword", hash1)).toBe(true);
		expect(comparePasswords("samePassword", hash2)).toBe(true);
	});
});


// --------------------------------



jest.mock("../mongoose/schemas/companySchema.js", () => ({
	Company: {
		exists: jest.fn(),
	},
}));


const exists = /** @type {any} */ (Company.exists);


describe("generateUniqueCode", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	
	it("returns an 8-digit string", async () => {
		exists.mockResolvedValue(false);
		const code = await generateUniqueCompanyInviteCode();
		expect(code).toMatch(/^\d{8}$/);
	});
	
	it("ensures code is unique across officerInviteCode and supervisorInviteCode", async () => {
		// first call: officerInviteCode exists → try again
		// second call: supervisorInviteCode exists → try again
		// third call: both false → return
		exists
			.mockResolvedValueOnce(true)  // officerInviteCode exists
			.mockResolvedValueOnce(false) // supervisorInviteCode doesn't exist
			.mockResolvedValueOnce(false) // officerInviteCode doesn't exist
			.mockResolvedValueOnce(true)  // supervisorInviteCode exists
			.mockResolvedValue(false);    // final both false
		
		const code = await generateUniqueCompanyInviteCode();
		expect(code).toMatch(/^\d{8}$/);
		
		// Ensure it retried more than once
		expect(exists).toHaveBeenCalledWith(
			expect.objectContaining({ officerInviteCode: expect.any(String) })
		);
		expect(exists).toHaveBeenCalledWith(
			expect.objectContaining({ supervisorInviteCode: expect.any(String) })
		);
	});
	
	it("retries until a unique code is found", async () => {
		// always return true for the first 4 attempts (collision), then false
		exists
			.mockResolvedValueOnce(true)
			.mockResolvedValueOnce(true)
			.mockResolvedValueOnce(true)
			.mockResolvedValueOnce(true)
			.mockResolvedValue(false);
		
		const code = await generateUniqueCompanyInviteCode();
		expect(code).toMatch(/^\d{8}$/);
		
		expect(exists).toHaveBeenCalled();
		expect(exists).toHaveBeenCalledWith(
			expect.objectContaining({ officerInviteCode: expect.any(String) })
		);
		expect(exists).toHaveBeenCalledWith(
			expect.objectContaining({ supervisorInviteCode: expect.any(String) })
		);
	});
});

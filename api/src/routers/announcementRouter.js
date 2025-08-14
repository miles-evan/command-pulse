import { Router } from "express";
import { permission } from "../middleware/permission.js";
import { getAnnouncements, sendAnnouncement } from "../queries/messageQueries.js";
import { getAnnouncementsValidation, sendAnnouncementValidation } from "../validation/announcementValidation.js";
import { validateRequest } from "../middleware/validate.js";
import { matchedData } from "express-validator";

const announcementRouter = Router();

// --------------------------------


// Send announcement
announcementRouter.post(
	"/",
	...validateRequest(sendAnnouncementValidation),
	...permission("supervisor"),
	async (request, response) => {
		const { message } = matchedData(request);
		
		const messageId = await sendAnnouncement(request.user.id, message);
		return response.status(201).send({ messageId });
	}
);


// Get announcements
announcementRouter.get(
	"/",
	...validateRequest(getAnnouncementsValidation),
	...permission("in company"),
	async (request, response) => {
		const { date, skip, limit } = matchedData(request);
		
		const announcements = await getAnnouncements(request.user.companyId, date, skip, limit);
		return response.send({ announcements });
	}
);


// --------------------------------

export default announcementRouter;
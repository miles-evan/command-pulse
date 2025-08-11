import { Router } from "express";
import { permission } from "../middleware/permission.js";
import { getAnnouncements, sendAnnouncement } from "../queries/messageQueries.js";

const announcementRouter = Router();

// --------------------------------


// Send announcement
announcementRouter.post(
	"/",
	...permission("supervisor"),
	async (request, response) => {
		const { message } = request.body;
		
		const messageId = await sendAnnouncement(request.user.id, message);
		return response.status(201).send({ messageId });
	}
);


// Get announcements
announcementRouter.get(
	"/",
	...permission("in company"),
	async (request, response) => {
		const { date, skip, limit } = request.query;
		
		const announcements = await getAnnouncements(request.user.companyId, date, Number(skip), Number(limit));
		return response.send({ announcements });
	}
);


// --------------------------------

export default announcementRouter;
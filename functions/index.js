/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const cors = require("cors")({ origin: true });

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const volunteerHistory = require("./modules/volunteerHistory");

const express = require("express");

// const mockVolunteerHistory = [
//     { id: 1, volunteerId: "vol001", date: "2025-08-21", event: "Dog Grooming", hours: 3 },
//     { id: 2, volunteerId: "vol001", date: "2025-09-10", event: "Dog Park Cleanup", hours: 2 },
//     { id: 3, volunteerId: "vol001", date: "2025-09-15", event: "Cat Grooming", hours: 3 },
//     { id: 4, volunteerId: "vol001", date: "2025-09-28", event: "Dog Park Cleanup", hours: 2},
//     { id: 5, volunteerId: "vol001", date: "2025-10-01", event: "Bird Feeding and Cage Cleanup", hours: 4}
// ];

//https endpoint that returns volunteer history
exports.getVolunteerHistory = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        res.status(200).json({
            data: [
                { id: 1, volunteerId: "vol001", date: "2025-08-21", event: "Dog Grooming", hours: 3 },
                { id: 2, volunteerId: "vol001", date: "2025-09-10", event: "Dog Park Cleanup", hours: 2 },
                { id: 3, volunteerId: "vol001", date: "2025-09-15", event: "Cat Grooming", hours: 3 },
                { id: 4, volunteerId: "vol001", date: "2025-09-28", event: "Dog Park Cleanup", hours: 2},
                { id: 5, volunteerId: "vol001", date: "2025-10-01", event: "Bird Feeding and Cage Cleanup", hours: 4}
            ],
        });
    });
});
//     res.set("Access-Control-Allow-Origin", "*"); // allow requests from your front end
//     res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
//     res.set("Access-Control-Allow-Headers", "Content-Type");

//     // handle pre-flight request for CORS
//     if (req.method === "OPTIONS") {
//         return res.status(204).send("");
//     }
//         // for now, just return the hard-coded data
//     return res.status(200).json({
//         success: true,
//         data: mockVolunteerHistory
//   });
// });
admin.initializeApp();
const app = express();
app.use(express.json());

app.use("history", volunteerHistory);

// Export the API as an HTTPS function
exports.api = functions.https.onRequest(app);


const Recipient = require("../../models/recipient");
const fs = require("fs");
const csv = require("csv-parser");
const { ExpressError } = require("../../utils/ErrorHandler");

module.exports.renderAllRecipients = async (req, res) => {
  const recipients = await Recipient.find();
  res.render("admin/allRecipients", { recipients: recipients });
};

module.exports.uploadRecipientsCSV = async (req, res) => {
  const EXPECTED_HEADERS = ["FULL NAME", "EMAIL"];
  if (!req.file) {
    throw new ExpressError("No file uploaded", 400);
  }

  const recipients = [];
  const filePath = req.file.path;

  //parse CSV
  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("headers", (headers) => {
        const missing = EXPECTED_HEADERS.filter(
          (header) => !headers.includes(header),
        );
        if (missing.length > 0) {
          fs.unlinkSync(filePath);
          (reject(
            new ExpressError(`Missing required columns ${missing.join(", ")}`),
          ),
            400);
        }
      })
      .on("data", (row) => {
        recipients.push({
          "FULL NAME": row["FULL NAME"].toLowerCase(),
          EMAIL: row["EMAIL"].toLowerCase(),
        });
      })
      .on("end", resolve)
      .on("error", reject);
  });

  fs.unlinkSync(filePath);

  // Save to DB, or do whatever logic you need
  // ✅ Build bulkWrite operations
  const operations = recipients.map((data) => ({
    updateOne: {
      filter: { email: data["EMAIL"] },
      update: {
        $set: {
          name: data["FULL NAME"],
        },
      },
      upsert: true, // create if doesn't exist
    },
  }));

  const result = await Recipient.bulkWrite(operations);

  const inserted = result.upsertedCount;
  const modified = result.modifiedCount;

  console.log(
    `CSV processed successfully — ${inserted} new recipients added, ${modified} updated.`,
  );

  //req.flash("success", `${recipients.length} recipients uploaded successfully!`);
  res.redirect("/adminportal/recipients");
};

module.exports.updateRecipientSubscription = async (req, res) => {
  const { recipientId } = req.body;

  if (!recipientId) {
    return res.status(400).json({ error: "Recipient ID is required" });
  }

  const recipient = await Recipient.findById(recipientId);
  if (!recipient) {
    return res.status(404).json({ error: "Recipient not found" });
  }

  recipient.subscribed = !recipient.subscribed;
  await recipient.save();
  console.log(recipient);

  res.json({ recipient });
};

module.exports.getAllRecipients = async (req, res) => {
  const allRecipients = await Recipient.find();
  const subscribedRecipients = allRecipients
    .filter((recipient) => recipient.subscribed)
    .map((recipient) => {
      return recipient.email;
    })
    .join(", ");
  res.json({ subscribedRecipients });
};

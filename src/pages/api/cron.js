export default async function handler(req, res) {
    // Check for authorization
    if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).end('Unauthorized');
    }

    // Your cron job logic here
    console.log("Cron job executed!");
    res.status(200).send("Cron job executed successfully");
}
export default function sendResponse(status, message, data = null) {
  return (req, res) => {
    res.send(status).json({ message, data });
  };
}

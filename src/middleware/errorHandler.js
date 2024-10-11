export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({ message: "ID inválido" });
  }
  if (err.message) {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({ message: "Error interno del servidor" });
};

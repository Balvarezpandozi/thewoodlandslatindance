const Price = require("../../models/price");

module.exports.renderNewPriceForm = (req, res) => {
  res.render("admin/newPrice");
};

module.exports.createPrice = async (req, res) => {
  const {
    name,
    description,
    price,
    isDisabled,
    buttonPrompt,
    contactBooking,
    order,
    url,
  } = req.body.price;

  const newPrice = new Price({
    name: name,
    description: description,
    price: price,
    isDisabled: "yes" == isDisabled ? true : false,
    buttonPrompt: buttonPrompt,
    contactBooking: "yes" == contactBooking ? true : false,
    order: order,
    url: url,
  });

  await newPrice.save();
  res.redirect(`/adminportal`);
};

module.exports.deletePrice = async (req, res) => {
  await Price.findByIdAndDelete(req.params.id);
  res.redirect(`/adminportal`);
};

module.exports.renderPrice = async (req, res) => {
  let price = await Price.findById(req.params.id);
  res.render("admin/price/index", { price: price });
};

module.exports.renderEditPriceForm = async (req, res) => {
  let price = await Price.findById(req.params.id);
  res.render("admin/price/edit", {
    price: price,
  });
};

module.exports.editPrice = async (req, res) => {
  const updates = req.body.price;

  await Price.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  res.redirect("/adminportal");
};

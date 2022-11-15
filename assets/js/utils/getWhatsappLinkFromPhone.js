export default function getWhatsappLinkFromPhone(phone) {
  return "https://wa.me/" + phone.replace(/[^0-9]/g, "");
}

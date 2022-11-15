export default function getTelLinkFromPhone(phone) {
  return "tel:" + phone.replace(/[^0-9]/g, "");
}

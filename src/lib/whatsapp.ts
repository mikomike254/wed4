const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export function generateWhatsAppLink(
  productName: string,
  size?: string,
  color?: string
): string {
  let message = `Hi Eddjos Collections! I'm interested in the ${productName}`;

  if (size) {
    message += ` (size ${size})`;
  }

  if (color) {
    message += ` in ${color}`;
  }

  message += ` – please share availability and delivery info.`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export function getWhatsAppFloatingLink(): string {
  const message = encodeURIComponent(
    "Hi Eddjos Collections! I'd like to browse your products and place an order."
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

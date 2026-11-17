export function enquiryEmail(subject: string, fields: [string, string][]) {
  const body = fields
    .filter(([, value]) => value.trim())
    .map(([label, value]) => `${label}: ${value.trim()}`)
    .join('\n\n');
  return `mailto:sparkdv310@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function whatsappDraft(message: string) {
  return `https://wa.me/917981546939?text=${encodeURIComponent(message)}`;
}

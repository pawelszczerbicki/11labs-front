export const onSelectFile = (event: any): Promise<{ url: string | ArrayBuffer | null; file: File }> => new Promise((resolve, reject) => {
  const file = event?.target?.files?.[0] || event[0];
  if (!file) return reject(new Error("No file selected"));
  const reader = new FileReader();
  reader.onload = () => resolve({url: reader.result, file});
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

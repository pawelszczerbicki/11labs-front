interface NgbDate {
  year: number,
  month: number,
  day: number
}

export const fromNgbDate = (d?: NgbDate | undefined | null) => d ? new Date(d.year, d.month - 1, d.day) : null;
export const fromNgbDateUtc = (d?: NgbDate | undefined | null) => d ? Date.UTC(d.year, d.month - 1, d.day) : null;
export const toNgbDate = (d: Date) => ({year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()})

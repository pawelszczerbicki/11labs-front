import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return value;

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let transformedText = value.replace(urlRegex, (url) => {
      const youtubeMatch = url.match(
        /(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/)([\w-]+)/
      );

      if (youtubeMatch) {
        const videoId = youtubeMatch[2];
        return this.getYouTubeEmbed(videoId);
      }

      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });

    return this.sanitizer.bypassSecurityTrustHtml(transformedText);
  }

  private getYouTubeEmbed(videoId: string): string {
    return `
<div class="text-center m-0 p-0">
      <iframe width="560" height="315"
              src="https://www.youtube.com/embed/${videoId}"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen>
      </iframe>
      </div>

    `;
  }
}

export default function TitleTooLong(title) {
  title = title.replace(/&quot;/g, '"');
  title = title.replace(/&#39;/g, "'");
  title = title.replace(/&lt;/g, "<");
  title = title.replace(/&gt;/g, ">");
  title = title.replace(/&amp;/g, "&");
  title = title.replace(/&#035;/g, "#");
  if (title.length > 50) {
    title = title.substr(0, 50);
    title = title + "...";

    return title;
  }
  return title;
}

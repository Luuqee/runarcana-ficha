export default function Section({ title, children, variant }) {
  return (
    <section className={`panel ${variant ? `panel--${variant}` : ""}`}>
      <div className="panelTitle">{title}</div>
      <div className="panelBody">{children}</div>
    </section>
  );
}

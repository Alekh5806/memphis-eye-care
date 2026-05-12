function SectionHeading({ eyebrow, title, text, align = 'left' }) {
  return (
    <div className={`section-heading ${align === 'center' ? 'section-heading-center' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

export default SectionHeading

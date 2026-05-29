export default function PageHeader({ title, description }) {
  return (
    <header className="page__header">
      <h1>{title}</h1>
      {description ? <p>{description}</p> : null}
    </header>
  )
}

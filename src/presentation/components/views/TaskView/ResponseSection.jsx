export function ResponseSection({ section }) {
  if (section.code) {
    return (
      <section className="response-block">
        <h4>{section.heading}</h4>
        <pre>
          <code>{section.code.join('\n')}</code>
        </pre>
      </section>
    );
  }

  return (
    <section className="response-block">
      <h4>{section.heading}</h4>
      <ul>
        {section.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </section>
  );
}

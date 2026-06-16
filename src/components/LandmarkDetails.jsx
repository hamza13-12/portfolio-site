// Shared content for a landmark's details — used by both the desktop
// hover tooltip and the mobile detail sheet so they stay identical.
export default function LandmarkDetails({ data }) {
  return (
    <>
      <div className="flex justify-between items-start mb-2 border-b border-ink/20 pb-1 gap-2">
        <p className="font-display text-mapred text-xs tracking-[0.1em] uppercase font-bold">
          {data.name}
        </p>
        <span className="text-[10px] text-ink-muted font-serif italic whitespace-nowrap">{data.period}</span>
      </div>

      <h3 className="text-ink font-serif text-xl leading-none font-bold mb-1">{data.role}</h3>
      <p className="text-ink-light text-xs font-medium mb-3">{data.company}</p>

      {data.metric && (
        <div className="bg-ink/5 border border-ink/10 rounded px-2 py-1.5 mb-2 relative overflow-hidden">
          <p className="text-mapred-light text-sm font-bold font-display relative z-10">
            {data.metric}
          </p>
          <p className="text-ink-muted text-[10px] leading-snug italic relative z-10">{data.metricLabel}</p>
        </div>
      )}

      {data.tech && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {data.tech.map((t, i) => (
            <span key={i} className="text-[9px] text-ink-dark border-b border-ink/30 px-0.5 leading-tight">
              {t}
            </span>
          ))}
        </div>
      )}
    </>
  )
}

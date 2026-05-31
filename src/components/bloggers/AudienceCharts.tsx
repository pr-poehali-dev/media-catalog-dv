import { BloggerAudience } from '@/data/data';
import {
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';

const CARMINE = '#A21D27';
const PINK = '#E03A8B';
const MUTED = '#E8E2D8';

function fmtPct(v: number) {
  return `${v.toString().replace('.', ',')}%`;
}

function HBars({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex flex-col gap-2.5">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-3">
          <div className="w-[150px] flex-shrink-0 text-[12px] text-[#0A0A0A] truncate">{d.label}</div>
          <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: MUTED }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${(d.value / max) * 100}%`, background: CARMINE }}
            />
          </div>
          <div className="w-[52px] flex-shrink-0 text-right font-display font-bold text-[12px] text-[#0A0A0A]">{fmtPct(d.value)}</div>
        </div>
      ))}
    </div>
  );
}

export default function AudienceCharts({ data }: { data: BloggerAudience }) {
  const hasAge = data.age && data.age.length > 0;
  const hasCities = data.cities && data.cities.length > 0;
  const hasGender = data.gender && data.gender.length > 0;

  return (
    <div className="flex flex-col gap-7">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {hasAge && (
          <div className="border border-[#E8E2D8] bg-[#FBF8F3] p-5">
            <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-4" style={{ letterSpacing: '0.14em' }}>Возраст</div>
            <HBars data={data.age!} />
          </div>
        )}
        {hasCities && (
          <div className="border border-[#E8E2D8] bg-[#FBF8F3] p-5">
            <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-4" style={{ letterSpacing: '0.14em' }}>Города</div>
            <HBars data={data.cities!} />
          </div>
        )}
      </div>

      {hasGender && (
        <div className="flex justify-center">
          <div className="border border-[#E8E2D8] bg-[#FBF8F3] p-5 w-full max-w-sm">
            <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-2 text-center" style={{ letterSpacing: '0.14em' }}>Пол аудитории</div>
            <div className="flex items-center gap-4">
              <div style={{ width: 130, height: 130 }} className="flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.gender!}
                      dataKey="value"
                      nameKey="label"
                      innerRadius={38}
                      outerRadius={62}
                      startAngle={90}
                      endAngle={-270}
                      stroke="none"
                    >
                      {data.gender!.map((_, i) => (
                        <Cell key={i} fill={i === 0 ? CARMINE : PINK} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-3">
                {data.gender!.map((g, i) => (
                  <div key={g.label} className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: i === 0 ? CARMINE : PINK }} />
                    <span className="text-sm text-[#0A0A0A]">{g.label}</span>
                    <span className="font-display font-bold text-sm text-[#0A0A0A]">{fmtPct(g.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
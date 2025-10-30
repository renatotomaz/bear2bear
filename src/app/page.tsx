import { createServer } from '@/lib/supabase'
import Link from 'next/link'


export default async function Catalog() {
const supabase = createServer()
const { data: books } = await supabase
.from('books')
.select('id,title,author,owner_id,profiles(name)')
.eq('is_active', true)
.order('created_at', { ascending: false })
.returns<any[]>()


return (
<div>
<h1 className="text-xl font-semibold mb-4">Catálogo</h1>
<ul className="grid md:grid-cols-2 gap-3">
{books?.map((b) => (
<li key={b.id} className="border rounded p-3 bg-white">
<div className="font-medium">{b.title}</div>
<div className="text-sm text-gray-600">{b.author}</div>
<div className="text-xs text-gray-500">Dono: {b.profiles?.name ?? '—'}</div>
<Link className="inline-block mt-2 text-blue-700" href={`/book/${b.id}`}>Detalhes</Link>
</li>
))}
</ul>
</div>
)
}
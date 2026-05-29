import PassProductCard from '../components/pass/PassProductCard'
import PageHeader from '../components/ui/PageHeader'
import PageState from '../components/ui/PageState'
import { usePasses } from '../hooks/usePasses'

export default function PassSelectPage() {
  const { data: passes, loading, error } = usePasses()

  return (
    <section className="page pass-select">
      <PageHeader
        title="패스 고르기"
        description="패스를 눌러 망원동 코스와 지도 동선을 확인한 뒤 구매하세요"
      />

      <div className="pass-select__list">
        <PageState loading={loading} error={error}>
          {passes?.map((pass) => (
            <PassProductCard key={pass.id} pass={pass} />
          ))}
        </PageState>
      </div>
    </section>
  )
}

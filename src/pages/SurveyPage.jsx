import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { submitSurvey } from '../api/surveyApi'
import { useSurveyQuestions } from '../hooks/useSurveyQuestions'
import { ROUTES } from '../constants/routes'
import { MSG } from '../constants/messages'
import { showSurveyIncomplete } from '../utils/alert'
import PageHeader from '../components/ui/PageHeader'
import './SurveyPage.css'

export default function SurveyPage() {
  const navigate = useNavigate()
  const { data: questions, loading, error } = useSurveyQuestions()
  const [answers, setAnswers] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function selectAnswer(questionId, optionId) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const totalCount = questions?.length ?? 0
  const answeredCount = questions?.filter((q) => answers[q.id]).length ?? 0
  const allAnswered = totalCount > 0 && answeredCount === totalCount

  function getUnansweredIds() {
    return questions?.filter((q) => !answers[q.id]).map((q) => q.id) ?? []
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!allAnswered) {
      await showSurveyIncomplete(answeredCount, totalCount)
      return
    }

    setSubmitting(true)
    setSubmitError('')
    try {
      await submitSurvey(answers)
      navigate(ROUTES.HOME, { replace: true })
    } catch (err) {
      setSubmitError(
        err.response?.data?.detail ?? '설문 저장에 실패했어요. 다시 시도해 주세요.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const unansweredIds = getUnansweredIds()

  return (
    <section className="page survey-page">
      <PageHeader
        title="나가기 취향 설문"
        description="5가지 질문으로 데이트·외식에 맞는 코스를 찾아보세요"
      />

      {loading ? (
        <p>{MSG.LOADING}</p>
      ) : error ? (
        <p>설문을 불러오지 못했어요</p>
      ) : (
        <form className="survey-form" onSubmit={handleSubmit}>
          {questions.map((question, index) => {
            const isUnanswered = unansweredIds.includes(question.id)
            return (
              <fieldset
                key={question.id}
                className={`survey-question${isUnanswered && answeredCount > 0 ? ' survey-question--incomplete' : ''}`}
              >
                <legend>
                  <span className="survey-question__num">{index + 1}</span>
                  {question.text}
                </legend>
                <div
                  className="survey-options"
                  role="radiogroup"
                  aria-label={question.text}
                >
                  {question.options.map((option) => {
                    const selected = answers[question.id] === option.id
                    return (
                      <button
                        key={`${question.id}-${option.id}`}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        className={`survey-option${selected ? ' survey-option--selected' : ''}`}
                        onClick={() => selectAnswer(question.id, option.id)}
                      >
                        {option.label}
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            )
          })}

          <p className="survey-form__progress" aria-live="polite">
            {answeredCount} / {totalCount} 문항 완료
          </p>

          {submitError && <p className="survey-form__error">{submitError}</p>}

          <button
            type="submit"
            className="btn btn--primary btn--lg btn--block"
            disabled={submitting}
          >
            {submitting ? '저장 중…' : '결과 보기'}
          </button>
        </form>
      )}

      <Link to={ROUTES.MYPAGE} className="survey-page__back">
        마이페이지로
      </Link>
    </section>
  )
}

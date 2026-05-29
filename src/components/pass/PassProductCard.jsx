import { useState } from 'react'
import { Link } from 'react-router-dom'
import CourseMap from '../map/CourseMap'
import SpotList from '../course/SpotList'
import { ROUTES } from '../../constants/routes'
import { formatPrice } from '../../utils/format'
import './PassProductCard.css'

function CourseBlock({ course, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`course-block${open ? ' course-block--open' : ''}`}>
      <button
        type="button"
        className="course-block__head"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="course-block__emoji" aria-hidden>
          {course.emoji}
        </span>
        <span className="course-block__info">
          <strong>{course.name}</strong>
          <span>{course.description}</span>
        </span>
        <span className="course-block__chevron" aria-hidden>
          {open ? '▲' : '▼'}
        </span>
      </button>

      {open && (
        <div className="course-block__body">
          <CourseMap
            spots={course.spots}
            courseName={course.name}
            active={open}
          />
          <SpotList spots={course.spots} variant="card" />
        </div>
      )}
    </div>
  )
}

export default function PassProductCard({ pass }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article
      className={`pass-product${expanded ? ' pass-product--expanded' : ''}`}
    >
      <button
        type="button"
        className="pass-product__head"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <span className="pass-product__emoji" aria-hidden>
          {pass.image}
        </span>
        <div className="pass-product__summary">
          <h2>{pass.name}</h2>
          <p className="pass-product__tagline">{pass.tagline}</p>
          <div className="pass-product__meta">
            <span>{pass.duration}</span>
            <span className="pass-product__price">
              {formatPrice(pass.price)}원
            </span>
          </div>
        </div>
        <span className="pass-product__toggle" aria-hidden>
          {expanded ? '−' : '+'}
        </span>
      </button>

      {expanded && (
        <div className="pass-product__body">
          <p className="pass-product__desc">{pass.description}</p>

          <div className="pass-product__courses">
            {pass.courses.map((course, index) => (
              <CourseBlock
                key={course.id}
                course={course}
                defaultOpen={index === 0}
              />
            ))}
          </div>

          <Link
            to={ROUTES.passPurchase(pass.id)}
            className="btn btn--primary btn--lg btn--block pass-product__buy"
          >
            {formatPrice(pass.price)}원 · 구매하기
          </Link>
        </div>
      )}
    </article>
  )
}

import './button.css'

export function Button({ children, CTA, onClick }) {
  return (
    <button class={`button shade textButton ${CTA == true ? "CTAButton" : ""}`} onClick={onClick}>
      {children}
    </button>
  )
}
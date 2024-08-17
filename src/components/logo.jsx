import "./logo.css";

export function Logo() {
  return (
    <div class="host">
      {" "}
      <div class="logo">
        {"\u00A0"} Guess the Hidden Number! {"\u00A0"}
      </div>
      <div class="hint">The hidden number is between 1 and 100 (inclusive)<br></br>How do you guess optimally?</div>
    </div>
  );
}

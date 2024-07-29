type Props = {
  count: number;
};

const displayDigits = 6;

const VisitorCount: React.FC<Props> = ({ count }) => {
  const countString = count.toString();
  const counter = [
    ...countString.split("").reverse(),
    ...new Array(displayDigits - countString.length).fill("0"),
  ].reverse();

  return (
    <div className="visitor-counter">
      <div>Visitor Counter</div>
      <div className="visitor-count">
        {counter.map((digit, index) => (
          <div key={index} className="digit">
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitorCount;

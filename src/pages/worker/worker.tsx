import { useWorker } from "@hooks";
import { Button } from "antd";

const Worker = () => {
  const { runWorker, result } = useWorker();
  const calculate = () => {
    runWorker(99999999);
  };
  const test = () => {
    console.log("test");
  };
  return (
    <div>
      <h1>Worker</h1>
      <Button type="primary" onClick={calculate}>
        calculate
      </Button>
      <Button type="primary" onClick={test}>
        run test
      </Button>
      <h1>Result: {result}</h1>
    </div>
  );
};

export default Worker;

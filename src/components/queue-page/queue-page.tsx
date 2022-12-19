import React, {useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styleQueue from "./queue.module.css";
import { Button } from "../ui/button/button"
import { Circle } from "../ui/circle/circle"
import { Input } from "../ui/input/input"
import {Queue} from "./utils";
import { ElementStates } from "../../types/element-states";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export type TQueueItem = {
  head?: string;
  value?: string;
  color: ElementStates;
};

export const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState(new Queue<TQueueItem>(7));
  const [input, setInput] = useState('');
  const queueLength = Array.from({ length: 7 }, () => ({ value: '', color: ElementStates.Default }));
  const [queueArr, setQueueArr] = useState<TQueueItem[]>(queueLength);
  const [theme, setTheme] = useState(false);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const queueAdd = async () => {
    if (input) {
      setInput('');
      queue.enqueue({ value: input, color: ElementStates.Default });
      setQueue(queue);
      queueArr[queue.getTail() - 1] = { value: '', color: ElementStates.Changing };
      setQueueArr([...queueArr]);
      await delay(SHORT_DELAY_IN_MS);
      queueArr[queue.getTail() - 1] = { value: input, color: ElementStates.Changing };
      setQueueArr([...queueArr]);
      queueArr[queue.getTail() - 1] = { value: input, color: ElementStates.Default };
      setQueueArr([...queueArr]);
    }
  };

  const queueDelete = async () => {
    setTheme(true);
    queue.dequeue();
    setQueue(queue);
    queueArr[queue.getHead() - 1] = { value: queueArr[queue.getHead() - 1].value, color: ElementStates.Changing };
    setQueueArr([...queueArr]);
    await delay(SHORT_DELAY_IN_MS);
    queueArr[queue.getHead() - 1] = { value: '', color: ElementStates.Default };
    setQueueArr([...queueArr]);
    if (queue.getHead() === 7 && queue.getTail() === 7 && queue.isEmpty()) {
      queueArr[queue.getHead() - 1] = { value: '', color: ElementStates.Default, head: 'head' };
      setQueueArr([...queueArr]);
    }
    setTheme(false);
  };

  const queueHandelClear = () => {
    queue.clear()
    setQueue(queue);
    setQueueArr(Array.from({ length: 7 }, () => ({ value: '', color: ElementStates.Default })));
  };

  return (
      <SolutionLayout title="Очередь">
        <form className={styleQueue.form}>
          <div className={styleQueue.block}>
            <Input
                maxLength={4}
                isLimitText={true}
                value={input}
                onChange={handleChangeInput}
            />
            <Button
                text="Добавить"
                disabled={input === '' || theme}
                onClick={queueAdd}
            />
            <Button
                text="Удалить"
                disabled={queue.isEmpty() || theme}
                onClick={queueDelete}
            />
          </div>
          <Button
              text="Очистить"
              disabled={!queue.getHead() && !queue.getTail() || theme}
              onClick={queueHandelClear}
          />
        </form>
        <div className={styleQueue.circles}>
          {queueArr && queueArr.slice(0, 7).map((item, index) => {
            return (
                <Circle
                    key={index}
                    letter={item.value}
                    index={index}
                    state={item.color}
                    head={(index === queue.getHead() && !queue.isEmpty()) || item.head ? 'head' : ''}
                    tail={(index === queue.getTail() - 1 && !queue.isEmpty()) ? 'tail' : ''} />
            )
          })}
        </div>
      </SolutionLayout>
  );
};











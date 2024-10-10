import React from "react";
import styles from "./Task.module.scss";
import classNames from "classnames";

interface TaskProps {
  title: string;
  id: string;
  active?: boolean;
  onPress?: (taskId: string, active: boolean) => void;
  taskActions?: React.ReactNode;
}

const Task: React.FC<TaskProps> = ({
  title,
  active,
  id,
  onPress,
  taskActions,
}) => {
  return (
    <div
      onClick={() => onPress?.(id, !active)}
      className={classNames(styles.wrapper, {
        [styles.active]: active,
      })}
    >
      {title}
      {taskActions}
    </div>
  );
};

export default Task;

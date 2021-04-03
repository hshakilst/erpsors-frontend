import React from "react";
import { LinearProgress, Fade } from "@material-ui/core";

export default function StyledTopProgressBar(props) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Fade in={props.isLoading}>
      <LinearProgress
        variant="determinate"
        value={progress}
        color="primary"
        style={{ zIndex: 1031 }}
      />
    </Fade>
  );
}

import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import { Button, Divider, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';

function MarkSlider({ title, name, defaultValue = 4, onChange }) {
  const [defaultMark, setDefaultMark] = useState();
  useEffect(() => {
    setDefaultMark(defaultValue);
  }, [defaultValue]);
  const sliderMarks = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: i + 1,
  }));

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2 }}
        alignItems="stretch"
        justifyContent={'space-around'}
      >
        <Grid item xs={4}>
          <Typography variant="body1">{title}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Slider
            min={0}
            max={10}
            step={1}
            name={name}
            value={defaultMark}
            marks={sliderMarks}
            onChange={() => {
              setDefaultMark(event.target.value);
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default MarkSlider;

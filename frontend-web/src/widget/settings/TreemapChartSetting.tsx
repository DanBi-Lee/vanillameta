import React, { useEffect } from 'react';
import { Divider, Grid, List, ListItem, ListItemText, styled } from '@mui/material';
import SelectForm from '@/components/form/SelectForm';
import WidgetTitleForm from '@/components/widget/WidgetTitleForm';
import { handleChange } from '@/widget/utils/handler';
import { AGGREGATION_LIST, COLUMN_TYPE } from '@/constant';
import ColorFieldForm from '@/components/form/ColorFieldForm';

const StyledList = styled(List)({
  position: 'relative',
  display: 'flex',
  flexWrap: 'wrap',
  '& .MuiListItemText-root': {
    width: '100%',
    marginBottom: 10,
  },
  '& .MuiListItemText-primary': {
    mb: 1,
    textAlign: 'left',
    fontWeight: 500,
    fontSize: 14,
  },
  '& .MuiListItem-root': {
    display: 'flex',
    flexDirection: ' column',
    rowGap: 8,
    width: '100%',
    padding: '30px 0 30px',
  },
});

const TreemapChartSetting = props => {
  const { option, setOption, spec } = props;

  // props로부터 받기 ------------------------------------
  const dataLength = 12; // color length
  // ----------------------------------------------------

  // color 생성
  const getColor = () => {
    const defaultColor = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
    if (!!option.series.field) {
      return;
    }
    const colorArr = [];
    // defaultColor의 배열을 돌면서 data의 길이만큼 요소를 순서대로 반환
    for (let i = 0; i < dataLength; i++) {
      colorArr.push(defaultColor[i % 9]);
    }
    setOption(prevState => ({
      ...prevState,
      series: { ...prevState.series, color: colorArr },
    }));
  };

  useEffect(() => {
    getColor();
  }, [option.series.field]);

  const handleSeriesChange = event => {
    setOption(prevState => ({
      ...prevState,
      series: {
        ...prevState.series,
        [event.target.name]: event.target.value,
      },
    }));
  };

  return (
    <Grid item xs={10} md={4} lg={3} sx={{ display: 'flex', flexDirection: 'column' }}>
      <WidgetTitleForm value={option.title} onChange={event => handleChange(event, setOption)} />
      <StyledList>
        <ListItem divider>
          <ListItemText primary="시리즈 설정" />
          <SelectForm
            required={true}
            id="field"
            name="field"
            label="필드"
            labelField="columnName"
            valueField="columnType"
            optionList={spec.filter(item => item.columnType === COLUMN_TYPE.NUMBER).map(item => item.columnName)}
            value={option.series.field}
            onChange={handleSeriesChange}
          />
          <SelectForm
            id="aggregation"
            name="aggregation"
            label="집계 방식"
            optionList={AGGREGATION_LIST}
            value={option.series.aggregation}
            onChange={handleSeriesChange}
            disabledDefaultValue
          />
          <SelectForm
            id="label"
            name="label"
            label="이름"
            labelField="columnName"
            valueField="columnType"
            optionList={spec.map(item => item.columnName)}
            value={option.series.label}
            onChange={handleSeriesChange}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="항목 별 색상 설정" />
          {!!option.series.field &&
            option.series.color.map((item, index) => (
              <React.Fragment key={index}>
                <ColorFieldForm
                  id={`color${index + 1}`}
                  name={`color${index + 1}`}
                  value={option.series.color[index]}
                  optionList={option}
                  setOption={setOption}
                  index={index}
                />
                <Divider />
              </React.Fragment>
            ))}
        </ListItem>
      </StyledList>
    </Grid>
  );
};

export default TreemapChartSetting;

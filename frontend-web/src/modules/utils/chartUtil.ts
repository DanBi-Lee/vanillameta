import { WIDGET_AGGREGATION } from '@/constant';

/**
 *
 * @param position
 */
export const getLegendOption = position => {
  let option = {};
  switch (position) {
    case 'left':
      option = {
        orient: 'vertical',
        left: 10,
        top: 'center',
      };
      break;
    case 'right':
      option = {
        orient: 'vertical',
        right: 10,
        top: 'center',
      };
      break;
    case 'top':
      option = {
        orient: 'horizontal',
        top: 'top',
      };
      break;
    case 'bottom':
      option = {
        orient: 'horizontal',
        top: 'bottom',
      };
      break;
  }
  return option;
};

/**
 *
 * @param position
 */

export const getGridSize = position => {
  let option = {};
  switch (position) {
    case 'left':
      option = { top: 50, right: 10, bottom: 50, left: 100 };
      break;
    case 'right':
      option = { top: 50, right: 100, bottom: 50, left: 10 };
      break;
    case 'top':
      option = { top: 80, right: 30, bottom: 20, left: 50 };
      break;
    case 'bottom':
      option = { top: 20, right: 30, bottom: 80, left: 50 };
      break;
  }
  return option;
};

/**
 *
 * @param type
 * @param items
 * @param field
 */
export const getAggregationData = (type, data, field) => {
  let result = 0;
  switch (type) {
    case WIDGET_AGGREGATION.SUM:
      data.forEach(item => {
        console.log('item ', item[field]);
        if (item[field]) {
          result += item[field];
        }
      });
      break;
    case WIDGET_AGGREGATION.AVG:
      data.forEach(item => {
        console.log('item ', item[field]);
        if (item[field]) {
          result += item[field];
        }
      });
      result = Math.floor(result / data.length);
      break;
    case WIDGET_AGGREGATION.MAX:
      data.forEach(item => {
        console.log('item ', item[field]);
        if (item[field]) {
          result = Math.max(result, item[field]);
        }
      });
      break;
    case WIDGET_AGGREGATION.MIN:
      data.forEach(item => {
        console.log('item ', item[field]);
        if (item[field]) {
          result = Math.min(result, item[field]);
        }
      });
      break;
    default:
  }
  return result;
};

/**
 * getAggregationDataForChart
 * @param array
 * @param keys
 * @param variable
 */
export const getAggregationDataForChart = (array, keys, variable, aggr = WIDGET_AGGREGATION.SUM) => {
  let key, temp;
  const countInfo = {};
  array.forEach(item => {
    const group = item[keys];
    console.log('group ', group);
    if (!countInfo[group]) {
      countInfo[group] = 1;
    } else {
      countInfo[group] = countInfo[group] + 1;
    }
  });
  console.log('countInfo', countInfo);
  const data = array.reduce((result, currentValue) => {
    console.log(result, currentValue);
    key = currentValue[keys];
    if (!result[key]) {
      result[key] = 0;
    }
    if (aggr === WIDGET_AGGREGATION.AVG) {
      result[key] += parseFloat(currentValue[variable]);
    } else if (aggr === WIDGET_AGGREGATION.MAX) {
      result[key] = !result[key] ? currentValue[variable] : Math.max(result[key], currentValue[variable]);
    } else if (aggr === WIDGET_AGGREGATION.MIN) {
      result[key] = !result[key] ? currentValue[variable] : Math.min(result[key], currentValue[variable]);
    } else {
      result[key] += parseFloat(currentValue[variable]);
    }
    return result;
  }, {});

  const grouped = [];
  Object.keys(data).forEach(function (key) {
    temp = {};
    temp[keys] = key;
    if (aggr === WIDGET_AGGREGATION.AVG) {
      temp[variable] = data[key] / countInfo[key];
    } else {
      temp[variable] = data[key];
    }
    grouped.push(temp);
  });
  return grouped;
};

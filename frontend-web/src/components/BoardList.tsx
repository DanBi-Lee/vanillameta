import React, { useEffect, useState } from 'react';
import { Box, List, Pagination, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import BoardListItem from './BoardListItem';
import usePagination from '@mui/material/usePagination';

function BoardList(props) {
  const { postList, handleDeleteSelect } = props;
  const [totalCount, setTotalCount] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setTotalCount(Math.ceil(postList.length / 10));
  }, [postList]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const tableBorder = '1px solid #DADDDD';

  const handlePageChange = (e, p) => {
    setPage(p);
  };

  const generateBoardItem = () => {
    return postList.map((item, i) => {
      const currPage = (page - 1) * 10;
      if (i >= currPage && i < currPage + 10) {
        return <BoardListItem postItem={item} key={item.id} handleDeleteSelect={handleDeleteSelect} />;
      } else {
        return null;
      }
    });
  };

  return (
    <Box>
      <Stack flexDirection="row" justifyContent="space-between" px={4} pb={1}>
        <Typography variant="body2" sx={{ ml: 0 }}>
          이름
        </Typography>
        <Typography variant="body2"></Typography>
        {matches && (
          <Typography variant="body2" sx={{ mr: '112px' }}>
            1 수정한 날짜
          </Typography>
        )}
      </Stack>
      <List sx={{ m: 'auto', border: tableBorder, borderRadius: 2, backgroundColor: '#fff' }} disablePadding>
        {generateBoardItem()}
      </List>
      <Stack alignItems="center" mt={4}>
        <Pagination count={totalCount} page={page} shape="rounded" onChange={handlePageChange} />
      </Stack>
    </Box>
  );
}

export default BoardList;

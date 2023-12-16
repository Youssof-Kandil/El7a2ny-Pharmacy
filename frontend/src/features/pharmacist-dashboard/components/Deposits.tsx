import * as React from 'react'
import Typography from '@mui/material/Typography'
import { Box, Container } from '@mui/material'

import { AccountBalanceWallet } from '@mui/icons-material'
import { Link } from 'react-router-dom'

function preventDefault(event: React.MouseEvent) {
  event.preventDefault()
}

export default function Deposits({ wallet }: { wallet?: number }) {
  console.log(wallet)

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          marginY: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          flexDirection: 'column',
        }}
      >
        <Typography variant="body1" component="span">
          Your Balance
        </Typography>
        <Typography
          component="p"
          variant="h4"
          fontSize={60}
          marginX={'auto'}
          fontWeight={'bold'}
        >
          {wallet ? `${wallet.toFixed(2)} ` : '0.00'}
        </Typography>
        <Container
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '85px',
            height: '70px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            top: '-120px',
            boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <AccountBalanceWallet sx={{ color: 'black' }} />
        </Container>
        <Typography color="lightgray" sx={{ flex: 1, paddingTop: 0 }}>
          E£
        </Typography>
        <Link
          style={{
            color: 'whitesmoke',
            display: 'flex',
            alignItems: 'center',
            paddingTop: '3px',
            textDecoration: 'none',
          }}
          onClick={preventDefault}
          to="#"
        ></Link>
      </Box>
    </React.Fragment>
  )
}

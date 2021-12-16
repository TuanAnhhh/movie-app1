import React from 'react'
import {Pagination} from '@material-ui/lab'
import { createTheme } from '@material-ui/core'
import {ThemeProvider, makeStyles} from "@material-ui/styles"
const darkTheme = createTheme({
    palette:{
        type:"dark"
    }
})
const useStyles = makeStyles({
    root:{
        display:"flex",
        justifyContent:"center",
        padding:"20px"
    }
})
function CustomPagination({setPage, numOfPages=10}) {
    const classes = useStyles();
    const handleChangePage= (page) => {
        setPage(page)
        window.scroll(0,0)
    }
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
             <Pagination
                color="primary"
                count={numOfPages}
                size="large"
                onChange={e=> handleChangePage(e.target.textContent)}
                className={classes.root}/>
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination

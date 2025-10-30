import React from 'react'

const SuccessfulSnackBar = ({pageStatus, onClose, openSuccessfulSnackBarState, notification, openfailedSnackBarState}) => {
  return (
    <>
    {isSuccess === `${pageStatus}` ? (
      <Snackbar
                open={openSuccessfulSnackBarState}
                autoHideDuration={5000}
                onClose={onClose}
              >
                <Alert
                  onClose={onClose}
                  severity="success"
                  variant="filled"
                  sx={{
                    width: "100%",
                    margin: "1em",
                    fontSize: "1em",
                  }}
                >
                  {notification}
                </Alert>
              </Snackbar>
            ) : (
              <Snackbar
                open={openfailedSnackBarState}
                autoHideDuration={5000}
                onClose={onClose}
              >
                <Alert
                  onClose={onClose}
                  severity="error"
                  variant="filled"
                  sx={{
                    width: "100%",
                    margin: "1em",
                    fontSize: "1em",
                  }}
                >
                  {notification}
                </Alert>
              </Snackbar>
            )}
    </>
  )
}

export default SuccessfulSnackBar;

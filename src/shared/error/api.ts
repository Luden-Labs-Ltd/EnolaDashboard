// ERROR HANDLERS
export async function handleServerError(error: any) {
  if (error.message) {
    return { nextError: error.message, statusCode: 500 };
  } else {
    return {
      nextError:
        "Unknown server error, Please try again later or contact support.",
      statusCode: 500,
    };
  }
}

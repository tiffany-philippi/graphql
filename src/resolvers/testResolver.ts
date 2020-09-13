const testResolver = {
  Test: {
    media: (test: any) => {
      //operação que me retorne obj tipo Media
      return {
        name: "Correio"
      }
    }
  },
  Media: {
    eta: () => 365*24*60
  },
  Query: {
    talk: () => ({
      message: 'Olá Dev'
    })
  }
}

export default testResolver;
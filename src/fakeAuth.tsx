
const fakeAuth =  async (username:string,password:string) =>
    new Promise<string>((resolve) => {
        setTimeout(() => resolve('2342f2f1d131rf12'), 250);
    });

export default fakeAuth;
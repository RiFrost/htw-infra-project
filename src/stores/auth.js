import { defineStore } from "pinia";
import { Auth } from "aws-amplify";

// not needed since Amplify Auth object is already handling storing session information
// maybe later if time we could handle auth info in store ourselfes

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    userId: null,
    accessToken: null,
  }),
  getters: {
    getUser: (state) => state.user,
    getAccessToken: (state) => state.accessToken,
    getUserId: (state) => state.userId,
  },
  actions: {
    async login(username, password) {
      try {
        await Auth.signIn({
          username,
          password,
        });

        this.user = await Auth.currentUserInfo();
        this.accessToken = await Auth.currentSession()
          .then(async (res) => {
            await this.authUser();
          })
          .catch(() => null);
        return Promise.resolve("Success");
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    async logout() {
      this.user = null;
      (this.userId = null), (this.accessToken = null);
      return await Auth.signOut();
    },
    async signUp(username, password, email) {
      try {
        await Auth.signUp({
          username,
          password,
          attributes: {
            email,
          },
        });

        return Promise.resolve();
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    async confirmSignUp(username, code) {
      try {
        await Auth.confirmSignUp(username, code);
        return Promise.resolve();
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    async authUser() {
      this.user = (await Auth.currentSession()
        .then((res) => {
          this.accessToken = res.getIdToken().getJwtToken();
          this.userId = res.getIdToken().payload.sub;
          return res;
        })
        .catch(() => null))
        ? await Auth.currentUserInfo().catch(() => null)
        : null;
    },
  },
});

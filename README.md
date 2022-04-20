# workout-tracker

Demo app for recording workouts, built with React and Supabase 💪

The goal is to get a taste for writing an app with CRUD support using Supabase as the BE 👨‍💻

Check it live at [demo3.popovs.dev](https://demo3.popovs.dev) 🚀

## Credits

Up until the [First Pull Request](https://github.com/ilyapopovs/workout-tracker/pull/1) the app had been developed by
going through John Komarnicki's [Vue 3 & Supabase | Workout Tracker App](https://www.youtube.com/watch?v=3tF0fGkd4ho)
course.
I was writing in React/Redux instead of Vue/Vuex, but the styling and the overall app logic comes from the course. \
After the first PR, it was some polish and Postgres Row Security Policy related changes - to limit workout record
to the user that added them (in the course the workouts are shared between the accounts).
More info in the [commit history](https://github.com/ilyapopovs/workout-tracker/commits/main).

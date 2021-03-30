# QuizReactDotNet
Quiz application using React &amp; DotNet

15 Question quiz with answer feedback and results.

-------

Start Backend = `dotnet run --project Backend/Backend.csproj`
- port 5000
- Requires a MSSQL server
- /api/QuizQuestion/
  - Serves a random question in JSON
    - question: string
    - correctId: int
    - answers: string[]

Start Frontend = `npm start`
- port 3000
- Site is served from root route
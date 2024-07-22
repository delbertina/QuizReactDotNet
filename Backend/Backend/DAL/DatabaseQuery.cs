using Microsoft.Extensions.Logging;
using System.Data.SqlClient;
using System.Data;
using System.Collections.Generic;
using System;
using Backend.Models;

namespace Backend.DAL
{
    public class DatabaseQuery
    {
        private readonly ILogger _logger;
        private readonly SqlConnectionStringBuilder builder;

        public DatabaseQuery(ILogger logger)
        {
            this.builder = new SqlConnectionStringBuilder();

            this.builder.DataSource = AppSettings.Instance.GetConnection("QuizAppDatabaseDatasource");
            this.builder.UserID = AppSettings.Instance.GetConnection("QuizAppDatabaseUsername");
            this.builder.Password = AppSettings.Instance.GetConnection("QuizAppDatabasePassword");
            this.builder.InitialCatalog = AppSettings.Instance.GetConnection("QuizAppDatabaseName");

            this._logger = logger;
        }
        public Question SelectById(int id)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
                {
                    connection.Open();
                    String sql = "SELECT * FROM Questions WHERE ID = @id";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        var idParam = new SqlParameter("id", SqlDbType.Int);
                        idParam.Value = id;

                        command.Parameters.Add(idParam);
                        SqlDataReader reader = command.ExecuteReader();
                        reader.Read();
                        Question returnQuestion = new Question(
                            reader.GetInt32(0)
                            , reader.GetString(1)
                            , reader.GetInt32(2)
                            , new string[] {reader.GetString(3)
                            , reader.GetString(4)
                            , reader.GetString(5)
                            , reader.GetString(6)}
                        );
                        return returnQuestion;
                    }
                }
            }
            catch (SqlException e)
            {
                this._logger.LogInformation(e.ToString());
                return null;
            }
        }

        public Question SelectRandom()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
                {
                    connection.Open();
                    String sql = "SELECT TOP 1 * FROM Questions ORDER BY NEWID()";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        SqlDataReader reader = command.ExecuteReader();
                        reader.Read();
                        Question returnQuestion = new Question(
                            reader.GetInt32(0)
                            , reader.GetString(1)
                            , reader.GetInt32(2)
                            , new string[] {reader.GetString(3)
                            , reader.GetString(4)
                            , reader.GetString(5)
                            , reader.GetString(6)}
                        );
                        return returnQuestion;
                    }
                }
            }
            catch (SqlException e)
            {
                this._logger.LogInformation(e.ToString());
                return null;
            }
        }

        public Question EditById(Question question)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
                {
                    connection.Open();
                    String sql = "UPDATE Questions SET QuestionText = @questiontext, QuestionCorrectID = @questioncorrectid,"
                        + " AnswerTextOne = @questionanswerone, AnswerTextTwo = @questionanswertwo,"
                        + " AnswerTextThree = @questionanswerthree, AnswerTextFour = @questionanswerfour"
                        + " OUTPUT INSERTED.* WHERE ID = @id";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        var idParam = new SqlParameter("id", SqlDbType.Int);
                        idParam.Value = question.questionid;
                        var textParam = new SqlParameter("questiontext", SqlDbType.VarChar);
                        textParam.Value = question.questiontext;
                        var correctParam = new SqlParameter("questioncorrectid", SqlDbType.Int);
                        correctParam.Value = question.questioncorrectid;
                        var qoneParam = new SqlParameter("questionanswerone", SqlDbType.VarChar);
                        qoneParam.Value = question.questionanswers[0];
                        var qtwoParam = new SqlParameter("questionanswertwo", SqlDbType.VarChar);
                        qtwoParam.Value = question.questionanswers[1];
                        var qthreeParam = new SqlParameter("questionanswerthree", SqlDbType.VarChar);
                        qthreeParam.Value = question.questionanswers[2];
                        var qfourParam = new SqlParameter("questionanswerfour", SqlDbType.VarChar);
                        qfourParam.Value = question.questionanswers[3];

                        command.Parameters.Add(idParam);
                        command.Parameters.Add(textParam);
                        command.Parameters.Add(correctParam);
                        command.Parameters.Add(qoneParam);
                        command.Parameters.Add(qtwoParam);
                        command.Parameters.Add(qthreeParam);
                        command.Parameters.Add(qfourParam);
                        SqlDataReader reader = command.ExecuteReader();
                        reader.Read();
                        Question returnQuestion = new Question(
                            reader.GetInt32(0)
                            , reader.GetString(1)
                            , reader.GetInt32(2)
                            , new string[] {reader.GetString(3)
                            , reader.GetString(4)
                            , reader.GetString(5)
                            , reader.GetString(6)}
                        );
                        return returnQuestion;
                    }
                }
            }
            catch (SqlException e)
            {
                this._logger.LogInformation(e.ToString());
                return null;
            }
        }
        public Question DeleteById(int id)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
                {
                    connection.Open();
                    String sql = "DELETE FROM Questions OUTPUT DELETED.* WHERE ID = @id";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        var idParam = new SqlParameter("id", SqlDbType.Int);
                        idParam.Value = id;

                        command.Parameters.Add(idParam);
                        SqlDataReader reader = command.ExecuteReader();
                        reader.Read();
                        Question returnQuestion = new Question(
                            reader.GetInt32(0)
                            , reader.GetString(1)
                            , reader.GetInt32(2)
                            , new string[] {reader.GetString(3)
                            , reader.GetString(4)
                            , reader.GetString(5)
                            , reader.GetString(6)}
                        );
                        return returnQuestion;
                    }
                }
            }
            catch (SqlException e)
            {
                this._logger.LogInformation(e.ToString());
                return null;
            }
        }
        public Question NewQuestion(NewQuestion question)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
                {
                    connection.Open();
                    String sql = "INSERT INTO Questions VALUES @questiontext, @questioncorrectid,"
                        + " @questionanswerone, @questionanswertwo,"
                        + " @questionanswerthree, @questionanswerfour"
                        + " OUTPUT INSERTED.*";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        var textParam = new SqlParameter("questiontext", SqlDbType.VarChar);
                        textParam.Value = question.questiontext;
                        var correctParam = new SqlParameter("questioncorrectid", SqlDbType.Int);
                        correctParam.Value = question.questioncorrectid;
                        var qoneParam = new SqlParameter("questionanswerone", SqlDbType.VarChar);
                        qoneParam.Value = question.questionanswers[0];
                        var qtwoParam = new SqlParameter("questionanswertwo", SqlDbType.VarChar);
                        qtwoParam.Value = question.questionanswers[1];
                        var qthreeParam = new SqlParameter("questionanswerthree", SqlDbType.VarChar);
                        qthreeParam.Value = question.questionanswers[2];
                        var qfourParam = new SqlParameter("questionanswerfour", SqlDbType.VarChar);
                        qfourParam.Value = question.questionanswers[3];

                        command.Parameters.Add(textParam);
                        command.Parameters.Add(correctParam);
                        command.Parameters.Add(qoneParam);
                        command.Parameters.Add(qtwoParam);
                        command.Parameters.Add(qthreeParam);
                        command.Parameters.Add(qfourParam);
                        SqlDataReader reader = command.ExecuteReader();
                        reader.Read();
                        Question returnQuestion = new Question(
                            reader.GetInt32(0)
                            , reader.GetString(1)
                            , reader.GetInt32(2)
                            , new string[] {reader.GetString(3)
                            , reader.GetString(4)
                            , reader.GetString(5)
                            , reader.GetString(6)}
                        );
                        return returnQuestion;
                    }
                }
            }
            catch (SqlException e)
            {
                this._logger.LogInformation(e.ToString());
                return null;
            }
        }
        public List<Question> SelectAll()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
                {
                    connection.Open();
                    String sql = "SELECT * FROM Questions";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        List<Question> returnList = new List<Question>();
                        SqlDataReader reader = command.ExecuteReader();
                        while (reader.Read())
                        {
                            Question returnQuestion = new Question(
                                reader.GetInt32(0)
                                , reader.GetString(1)
                                , reader.GetInt32(2)
                                , new string[] {reader.GetString(3)
                            , reader.GetString(4)
                            , reader.GetString(5)
                            , reader.GetString(6)}
                            );
                            returnList.Add(returnQuestion);
                        }
                        return returnList;
                    }
                }
            }
            catch (SqlException e)
            {
                this._logger.LogInformation(e.ToString());
                return null;
            }
        }
        public int SelectTotal()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
                {
                    connection.Open();
                    String sql = "SELECT COUNT(ID) FROM Questions";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        SqlDataReader reader = command.ExecuteReader();
                        reader.Read();
                        return reader.GetInt32(0);
                    }
                }
            }
            catch (SqlException e)
            {
                this._logger.LogInformation(e.ToString());
                return 0;
            }
        }
        public bool ResetDatabase()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
                {
                    connection.Open();
                    string sql1 = "DROP TABLE Questions ";
                    string sql2 = "CREATE TABLE Questions ( "
                        + "ID int IDENTITY(1,1) NOT NULL PRIMARY KEY, "
                        + "QuestionText nvarchar(250) NOT NULL, "
                        + "QuestionCorrectID int NOT NULL, "
                        + "AnswerTextOne nvarchar(64) NOT NULL, "
                        + "AnswerTextTwo nvarchar(64) NOT NULL, "
                        + "AnswerTextThree nvarchar(64) NOT NULL, "
                        + "AnswerTextFour nvarchar(64) NOT NULL "
                        + "); ";
                    string sql3 = "INSERT INTO Questions(QuestionText, QuestionCorrectID, AnswerTextOne, AnswerTextTwo, AnswerTextThree, AnswerTextFour) "
                        + "VALUES ('What is 2 + 2?', 2, '2', '3', '4', '5'), "
                        + "('What is 1 + 2?', 1, '2', '3', '4', '1'), "
                        + "('What is 3 + 2?', 3, '6', '3', '4', '5'), "
                        + "('What is 2 + 4?', 0, '6', '7', '4', '5'), "
                        + "('What is 3 + 3?', 0, '6', '8', '7', '5');";
                    var command = new SqlCommand(sql1, connection);
                    try
                    {
                        command.ExecuteNonQuery();
                    }
                    catch (SqlException e)
                    {
                        this._logger.LogWarning("Error dropping table! " + e.ToString());
                    }
                    command.CommandText = sql2;
                    command.ExecuteNonQuery();
                    connection.Close();
                    connection.Open();
                    command.CommandText = sql3;
                    int rowsChanged = command.ExecuteNonQuery();
                    return rowsChanged > 0;
                }
            }
            catch (SqlException e)
            {
                this._logger.LogInformation(e.ToString());
                return false;
            }
        }
    }
}
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Question
    {
        [Key]
        [Required]
        public int questionid { get; set; }
        [Required]
        [StringLength(250)]
        public string questiontext { get; set; }
        [Required]
        [Range(0, 3)]
        public int questioncorrectid { get; set; }
        [Required]
        [MinLength(4)]
        [MaxLength(4)]
        public string[] questionanswers { get; set; }

        public Question(int questionId, string questionText, int questionCorrectId
            , string[] questionAnswers)
        {
            questionid = questionId;
            questiontext = questionText;
            questioncorrectid = questionCorrectId;
            questionanswers = new string[] {
                questionAnswers[0], questionAnswers[1]
                , questionAnswers[2], questionAnswers[3]
            };
        }
    }
    public class NewQuestion
    {
        [Required]
        [StringLength(250)]
        public string questiontext { get; set; }
        [Required]
        [Range(0, 3)]
        public int questioncorrectid { get; set; }
        [Required]
        [MinLength(4)]
        [MaxLength(4)]
        public string[] questionanswers { get; set; }
    }
}
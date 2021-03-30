using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Backend.DAL;
using Backend.Models;
using System.Collections.Generic;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuizQuestionController : ControllerBase
    {
        private readonly ILogger<QuizQuestionController> _logger;
        private readonly DatabaseQuery _query;

        public QuizQuestionController(ILogger<QuizQuestionController> logger)
        {
            _logger = logger;
            _query = new DatabaseQuery(_logger);
        }

        [HttpGet("")]
        public IActionResult Get()
        {
            // Select a random question
            Question foundQuestion = _query.SelectRandom();
            // If no questions in the database, return error
            if (foundQuestion == null)
            {
                return BadRequest("No questions in the database! Add questions first!");
            }
            else
            {
                return Ok(foundQuestion);
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            // Select the question with specific ID
            Question foundQuestion = _query.SelectById(id);
            // If no question, return error
            if (foundQuestion == null)
            {
                return BadRequest("No question exists with ID " + id);
            }
            else
            {
                return Ok(foundQuestion);
            }
        }

        [HttpPost("{id}")]
        public IActionResult Edit([FromBody] Question incomingQuestion)
        {
            // Update the question with specific ID
            Question editReturn = _query.EditById(incomingQuestion);
            // If no question at that id, return error
            if (editReturn == null)
            {
                return BadRequest("No question exists with ID " + incomingQuestion.questionid);
            }
            else
            {
                return Ok(editReturn);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // Delete the questions with specific ID
            Question deleteReturn = _query.DeleteById(id);
            // If no question exists, return error
            if (deleteReturn == null)
            {
                return BadRequest("No question exists with ID " + id);
            }
            else
            {
                return Ok(deleteReturn);
            }
        }

        [HttpPost("")]
        public IActionResult New([FromBody] NewQuestion incomingQuestion)
        {
            // Add a new question
            Question newReturn = _query.NewQuestion(incomingQuestion);
            // If no question returned
            if (newReturn == null)
            {
                return BadRequest("An error occured while adding new question!");
            }
            else
            {
                return Ok(newReturn);
            }
        }

        [HttpGet("total")]
        public IActionResult GetTotal()
        {
            // Get the total questions in the database
            int totalQuestions = _query.SelectTotal();
            // If there are no questions, return error
            if (totalQuestions < 1)
            {
                return BadRequest("No questions in the database!");
            }
            else
            {
                return Ok(("{ \"total\": " + totalQuestions + " }"));
            }
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            // Get a list of all questions
            List<Question> allQuestions = _query.SelectAll();
            // If there are no questions, return error
            if (allQuestions.Count < 1)
            {
                return BadRequest("No questions in the database!");
            }
            else
            {
                return Ok(allQuestions);
            }
        }
    }
}

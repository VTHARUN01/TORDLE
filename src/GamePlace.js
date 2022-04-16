import RowXColumn from "./shared/data";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
export const Tordle = (props) => {
  const [rowCount, SetrowCount] = useState(1);
  let Word = ["", "", "", "", ""];
  const [success, Setsuccess] = useState(false);
  const handleFocus = (id, value) => {
    if (id <= rowCount * 5 && id >= (rowCount - 1) * 5) {
      if (value != "") {
        const nextField = document.getElementById(parseInt(id) + 1);
        id <= rowCount * 5 - 1 && nextField != null
          ? nextField.focus()
          : console.log("Not Possible");
      }
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {RowXColumn.map((column, n) => (
          <Box
            key={n}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {column.map((element, m) => (
              <form
                style={{
                  marginRight: "5px",
                  marginTop: "10px",
                  width: "50px",
                  height: "50px",
                }}
                key={m}
                noValidate
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  let count = 0;

                  if (Word.join("").length == 5) {
                    // const words = Word.join("");
                    // const options = {
                    //   method: "GET",
                    //   url: `https://wordsapiv1.p.rapidapi.com/words/${words}/typeOf`,
                    //   headers: {
                    //     "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
                    //     "X-RapidAPI-Key":
                    //       "89ff0e1e92msh4fda4028299ea6bp1ab731jsnb20e5b21934b",
                    //   },
                    // };

                    // axios
                    //   .request(options)
                    //   .then(function (response) {
                    //     console.log(response.data);
                    //   })
                    //   .catch(function (error) {
                    //     console.error(error);
                    //   });
                    const WordsArray = props.TodayWord.split("");
                    for (let i = 0; i < 5; i++) {
                      if (Word[i] == WordsArray[i]) {
                        column[i].color = "green";
                        count++;
                      } else if (WordsArray.includes(Word[i])) {
                        column[i].color = "yellow";
                      } else {
                        column[i].color = "grey";
                      }
                    }
                  }
                  console.log(props.TodayWord);
                  if (count == 5) {
                    alert("NICE JOB!!!!");
                    window.location.reload();
                  } else if (rowCount == 6) {
                    alert(`NIGGA,THE WORD IS ${props.TodayWord}`);
                    window.location.reload();
                  } else if (Word.join("").length == 5) {
                    Word = ["", "", "", "", ""];
                    SetrowCount(rowCount + 1);
                    let nextField = document.getElementById(
                      parseInt(rowCount * 5) + 1
                    );
                    nextField != null
                      ? nextField.focus()
                      : console.log("Not Possible");
                  } else {
                    alert("ENTER A 5 LETTER WORD");
                  }
                }}
              >
                <TextField
                  onKeyDown={(e) => {
                    if (e.keyCode == 8) {
                      if (e.target.value == "") {
                        if (
                          e.target.id <= rowCount * 5 &&
                          e.target.id >= (rowCount - 1) * 5
                        ) {
                          const nextField = document.getElementById(
                            parseInt(e.target.id) - 1
                          );
                          e.target.id >= (rowCount - 1) * 5 + 1 &&
                          nextField != null
                            ? nextField.focus()
                            : console.log("Not Possible");
                          if (nextField != null) {
                            Word[
                              parseInt(e.target.id) - (rowCount - 1) * 5 - 1
                            ] = "";
                          }
                        }
                      } else {
                        Word[parseInt(e.target.id) - (rowCount - 1) * 5 - 1] =
                          "";
                        return;
                      }
                    } else {
                      const Letter = /[a-zA-Z]/;
                      if (Letter.test(e.target.value) || e.target.value == "") {
                        Word[parseInt(e.target.id) - (rowCount - 1) * 5 - 1] =
                          e.target.value.toUpperCase();

                        element.value = e.target.value.toUpperCase();
                      }
                      handleFocus(e.target.id, e.target.value);
                    }
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: element.color,
                  }}
                  variant="outlined"
                  id={element.id}
                  inputProps={{
                    maxLength: 1,
                    type: "text",
                    style: {
                      textTransform: "capitalize",
                      color: "white",
                    },
                  }}
                />
              </form>
            ))}
          </Box>
        ))}
      </Box>
    </div>
  );
};

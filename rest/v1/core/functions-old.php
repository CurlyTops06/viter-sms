<?php
// Data Types
$numberValue = 123;
$floatValue = 3.14;
$stringValue = 'Hello World'; //Cocatenation of sting (dot or period)
$booleanValue = true;
$arrayValue = [1, 2, 3, 4, 5];
$objectValue = (object) ['name' => 'John', 'age' => 30];
$nullValue = null;
$undefinedValue = 'undefined';

$arrayObject = [
    array(
        'name' => 'John',
        'age' => 30,
        'hobbies' => ['reading', 'gaming', 'coding']
    ),
    array(
        'name' => 'John',
        'age' => 30,
        'hobbies' => ['reading', 'gaming', 'coding']
    )
];

for ($i = 0; $i < count($arrayValue); $i++) {
    echo $arrayValue[$i] . "<br/>";
}

foreach ($arrayObject as $index => $value) {
    echo  "Name:" . $value['name'] . "<br/>";
    foreach ($value['hobbies'] as $i => $hobby) {
        $number = $i + 1;
        echo "Habbits {$number}: " . $hobby . "<br/>";
    }
}

echo $stringValue;

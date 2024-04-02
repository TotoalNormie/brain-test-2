<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Item;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Item::insert([
            ['name' => 'blueberry', 'type' => 'theme', 'price' => 1000],
            ['name' => 'cyber', 'type' => 'theme', 'price' => 6000],
            ['name' => 'apple', 'type' => 'theme', 'price' => 1000],
            ['name' => 'raspberry', 'type' => 'theme', 'price' => 3000],
            ['name' => 'strawberry', 'type' => 'theme', 'price' => 3000],

            ['name' => 'programming', 'type' => 'cards', 'price' => 7000],
            ['name' => 'countries', 'type' => 'cards', 'price' => 4000],
            


            // ... Add more items as needed
        ]);
    }
}

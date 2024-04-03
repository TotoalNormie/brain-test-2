<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    private $chestPrices = [
        'mixed' => 3000,
        'theme' => 4000,
        'cards' => 5000,
    ];
    private $chests = [
        ['type' => 'mixed', 'price' => 3000],
        ['type' => 'theme', 'price' => 4000],
        ['type' => 'cards', 'price' => 5000],
    ];

    public function view()
    {
        return Inertia::render('Inventory/Index', [
            'inventory' => Inventory::with('item')
                ->where('user_id', auth()->user()->id)
                ->get()
                ->sortBy('item.name')
                ->sortByDesc('item.price')
                ->groupBy('item.type'),
            'chests' => $this->chests,
        ]);
    }

    public function buyChest(Request $request)
    {
        $request->validate(['type' => 'string|required']);
        if (auth()->user()->coins < $this->chestPrices[$request->type]) {
            return redirect()->back()->withErrors([
                'coins' => "Not enough coins to purchase the {$request->type} chest."
            ]);
        }
        auth()->user()->coins -= $this->chestPrices[$request->type];
        auth()->user()->save();

        $item = Item::query()
            ->when($request->type == 'mixed', function ($query) {
                $query->inRandomOrder();
            })
            ->when(in_array($request->type, ['theme', 'cards']), function ($query) use ($request) {
                $query->where('type', $request->type)->inRandomOrder();
            })
            ->first();

        // \Log::error(gettype($item));
        // \Log::error($item);
        Inventory::create([
            'user_id' => auth()->user()->id,
            'item_id' => $item['id'],
        ]);

        return redirect()->back()->withErrors([
            'item' => json_encode($item),
        ]);
    }
    public function sellItem(Request $request)
    {
        $request->validate(['id' => 'integer|required']);
        $item = Inventory::find($request->id);
        if (!$item) {
            return redirect()->back()->withErrors([
                'sell' => "Item not found.",
            ]);
        }
        auth()->user()->coins += $item->item->price;

        $item->delete();
        return redirect()->back();
    }
}




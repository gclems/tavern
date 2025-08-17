<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCampaignRequest;
use App\Models\Campaign;
use App\Services\CampaignService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class CampaignsController extends Controller
{
    public function __construct(protected CampaignService $campaignService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('campaigns/index/page', [
            'campaigns' => $request->user()->campaigns()->orderBy('updated_at')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateCampaignRequest $request): RedirectResponse
    {
        $campaign = $this->campaignService->create($request->user(), $request->string('name'));

        return redirect(route('campaigns.show', $campaign));
    }

    /**
     * Display the specified resource.
     */
    public function show(Campaign $campaign): Response
    {
        Gate::authorize('view', $campaign);

        return Inertia::render('campaigns/show/page', [
            'campaign' => $campaign,
            'noteCategories' => $campaign->noteCategories()->orderBy('sort_order')->get(),
            'notes' => $campaign->notes()->orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
